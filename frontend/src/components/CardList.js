import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, FreeMode } from 'swiper'
import { Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'
import EventCard from '../components/EventCard'

const CardList = ({ setCurrentId, cat }) => {
  const [events, setEvents] = useState([])
  console.log(cat)

  const fetchEvents = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKURL}/event/byCategory/${cat._id}`
    )
    setEvents(data?.data)
  }

  useEffect(() => {
    fetchEvents()
  }, [])
  return (
    <div>
      <Container>
        <Swiper
          breakpoints={{
            960: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            720: {
              slidesPerView: 3,
              spaceBetween: 6,
            },
            540: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 2,
            },
          }}
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
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

//eventByCategorie
/**
 * 
 *eventCat =  [
 * {
 * category: "camping"
 * events: [{
 *name: event2,
 price:
 * }]
 * }
 * ,
 * {
 * 
 * category: skyDiving}
 * ]
 * 
 * 
 * 
 * eventCat.map(el => {
 * return <div>
 * <h3>{el.category}</h3>
 * <Slider data={el.events} />
 * </div>
 * })
 * 
 * 
 * 
 */
