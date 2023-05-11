import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import EventCard from '../components/EventCard'

const CardList = ({ setCurrentId }) => {
  const [events, setEvents] = useState([])

  const fetchEvents = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/event/byDate/byDate`
    )
    setEvents(data?.data)
  }

  useEffect(() => {
    fetchEvents()
  }, [])
  return (
    <div>
      {events.length ? <h2> Evenements à venir</h2> :<></>}
      <Container>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className='mySwiper'
        >
          {events.map((event, i) => (
            <SwiperSlide style={{}} key={i}>
              <EventCard event={event} setCurrentId={setCurrentId} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      <script src='https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js'></script>
    </div>
  )
}

export default CardList
