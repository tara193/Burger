import React, {useState, useEffect} from 'react';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import { Redirect} from 'react-router-dom';
import classes from './Auth.css';
import * as actionCreator from '../../store/action/index';
import { connect } from 'react-redux';
import Spinner from '../../component/UI/Spinner/Spinner';
import {updatedObject, checkValidity} from '../../shared/utility'

const auth =props => {
    const [controls, setControls] = useState({
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
    });
        
    const[isSignup, setIsSignup]= useState(true);
    const {buildingBurger,authRedirectPath, onSetAuthRedirectPath} = props;

    useEffect(()=>{
        if(!buildingBurger && authRedirectPath !== '/'){
            onSetAuthRedirectPath();
        }
    },[buildingBurger,authRedirectPath, onSetAuthRedirectPath]);

    

    const submitHandler = ( event ) => {
        event.preventDefault();
        props.onAuth(controls.email.value, 
            controls.password.value, 
            isSignup);
    }

    const singupModeHandler =() =>{
        setIsSignup(!isSignup);
    }


    const inputChangedHandler = (event,controlName)=>{
        const updatedControls= updatedObject(controls,{
            [controlName]:updatedObject(controls[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value, controls[controlName].validation),
                touched:true
            })
        });
        setControls(updatedControls);
    }

        const formElementArray=[];
        for(let key in controls){
            formElementArray.push(
                { 
                id:key,
                config:controls[key] } );
        }

        let form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=> inputChangedHandler(event,formElement.id)}/>
        ));

        if(props.loading){
            form=<Spinner/>
        }
        let errorMessage = null
        if(props.error){
            errorMessage= (
                <p> {props.error.message} </p>
                );
        }

        let authRedirect=null;
        if(props.isAuthenticated){
            authRedirect = <Redirect to= {props.authRedirectPath} />
        }
        return(
            <div  className= {classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit= {submitHandler}>
                    {form}
                    <Button btntype="Success"> SUBMIT </Button>
                </form>
                <Button 
                btntype="Danger" 
                clicked={singupModeHandler}> 
                CLICK TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>

        );
    }

const mapStateToProps = state => {
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignup) => dispatch(actionCreator.auth(email, password, isSignup)),
        onSetAuthRedirectPath : () => dispatch(actionCreator.authRedirectPath('/'))
    }
};

export default connect ( mapStateToProps, mapDispatchToProps) (auth);