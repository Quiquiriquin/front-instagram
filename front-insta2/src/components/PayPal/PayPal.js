import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

/*
    factorial(n) {
        2 n >= 1
        4 + factorial(n-1) n > 1
    }

    Fibonacci {
        2, n < 2
        5 + Fibonacci(n-1) + Fibonacci(n-2) , n >= 2
    }
 */

class Paypal extends Component{

    constructor(props){
        super(props)

        this.state = {
            showButton:false
        }
        window.ReactDOM = ReactDOM;
        window.React =  React;

    }

    componentDidMount(){
        const {
            isScriptLoaded,
            isScriptLoadedSucceed
        } =  this.props

        if(isScriptLoaded && isScriptLoadedSucceed){
            this.setState(
                {showButton:true}
            )
        }

    }

    componentWillReceiveProps(nextProps){
        const {
            isScriptLoaded,
            isScriptLoadedSucceed
        } =  nextProps

        const isLoadedButWasntLoadedBefore = 
            !this.state.showButton &&
            !this.props.isScriptLoaded && 
            isScriptLoaded

        if(isLoadedButWasntLoadedBefore){
            if(isScriptLoadedSucceed){
                this.setState({showButton:true})
            }
        }


    }


    render(){

        const paypal =  window.PAYPAL
        const {
            total,
            currency,
            env,
            commit,
            client,
            onSuccess,
            onError,
            onCancel
        } = this.props

        const {
            showButton
        } =  this.state

        const payment = () => {
            paypal.rest.payment.create(env,client,{
                transactions:{
                    amount:{
                        total,
                        currency
                    }
                }
            })
        }

        const onAuthorize =  (data,actions) => {
            actions.payment.execute()
                .then(() => {
                    const payment = {
                        paid:true,
                        cancelled:false,
                        payerID:data.payerID,
                        paymentID:data.paymentID,
                        paymentToken:data.paymentToken,
                        returnUrl:data.returnUrl
                    }

                    onSuccess(payment)

                })
        }

        return (
            <div>
                    {   showButton && <paypal.Button.react

                            env={env}
                            client={client}
                            commit={commit}
                            payment={payment}
                            onAuthorize={onAuthorize}
                            onCancel={onCancel}
                            onError={onError}
                    />

                    }

            </div>
        )


    }
}
 
export default scriptLoader("https://www.paypalobjects.com/api/checkout.js")(Paypal);