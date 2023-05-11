const stripe = require('stripe')('sk_test_51Kehe2EBwxdizjs5p1moZLMC7hOSSO8PcxLl9nVW9wcdrAAlPOPIjb8xVayeVe5oD28ZJtrsPw2LPDpTKk3LnxKz002GOBgDE3');
const { param } = require('../routes/users');
const userController = require('./userController')
// helpers
/*const createUser = async (req, res, next) => { try {
    const searchUser = await stripe.customers.list({email:'mohamedyassineali@es.tn',limit:3})
    console.log('serchedU :',searchUser)
    if (searchUser) {
      return(searchUser.data[0])
    } else {
      const customer = await stripe.customers.create({
        id: 19987,
        email: "mohamedyassineali@es.tn"
      });
      return customer;
    }
    
  } catch (error) {
    console.error(error);
  }};
 
const addCreditCard = async (user, card) => {
    try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card,
    });
    
    const attached = await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: user.id,
    });
    return paymentMethod;
  } catch (error) {
    console.error(error);
  }};
 
const processPayment =async (req,user, card) => {
 
    try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: req.body.amount || 3000,
          customer:  user.id,
          currency: 'usd',
          payment_method: card.id,
        });

        const paymentIntent1 = await stripe.paymentIntents.confirm(paymentIntent.id)
      } catch (error) {
        console.error(error);
      }
};
 
exports.pay =async (req, res, next) => {
 try {
   console.log('Stripe demo');
   // TODO: create user
   const user = await createUser();
  
   // TODO: add credit card to user
   const creditCard = await addCreditCard(user, {
  	number: '4242424242424242',
  	exp_month: 9,
  	exp_year: 2023,
  	cvc: '314',
   });
   // TODO: create payment intent for user
   await processPayment(req,user, creditCard);
 
   res.status(200);
   console.log("succeeded");
 } catch (e) {

   console.error(e);
 }
};*/



exports.pay=async(req,res)=>{

  const { amount, token } = req.body;
  stripe.customers
    .create({
      email: token.email,
      source: token.id,
      name: token.card.name,
    })
    .then((customer) => {
      return stripe.paymentIntents.create({
        amount: parseFloat(amount) * 100,
        description: `Payment for USD ${amount}`,
        currency: "USD",
        customer: customer.id,
        payment_method: token.card.id,
      });
    })
    .then((charge) =>        stripe.paymentIntents.confirm(charge.id).then((c)=> res.status(200).send(charge)))
    .catch((err) => console.log(err));
}
