import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import * as Yup from 'yup';
import styled from 'styled-components';

//////////// Initial State/Objects //////////////

const initialState = {
    name: '',
    email: '',
    size: '',
    instructions: ''
};

const formSchema = Yup.object().shape({
    name: Yup
        .string()
        .min(2, "Name must be 2 characters long")
        .required('Must include user name'),
    email: Yup
        .string()
        .email('Must be a valid email address.')
        .required('Must include email address'),
    size: Yup
        .string()
        .oneOf(['Small','Medium', 'Large', 'XL'])
        .required("please pick a size!"),
    instructions: Yup
        .string()
});

const toppings = ['Pepperoni', 'Sausage', 'Chicken', 'Bacon', 'Pineapple', 'Mushrooms', 'Spinach', 'Jalapenos'];

toppings.forEach(top => {
    initialState[top] = false;
    // formSchema[top] = Yup.boolean();
});

const initialErrorObj = {};

Object.keys(initialState).forEach(key => {
    initialErrorObj[key] = '';
})

////////////////// Component Starts Here /////////////////

const OrderForm = () => {
    const [ formState, setFormState ] = useState(initialState);
    const [ errors, setErrors ] = useState(initialErrorObj);
    const [ disabled, setDisabled ] = useState(true);


    const validateChange = (eTarget) => {
        console.log('validate event', eTarget)
        Yup
            .reach(formSchema, eTarget.name)
            .validate(eTarget.type === 'checkbox' ? eTarget.checked : eTarget.value)
            .then(bool => {
                setErrors({
                    ...errors,
                    [eTarget.name]: ''
                })
            })
            .catch(err => {
                console.log('MADE IT HERE')
                setErrors({
                    ...errors,
                    [eTarget.name]: err.errors[0]
                })
            })
    };

    useEffect(() => {
        formSchema.isValid(formState)
            .then(bool => {
                setDisabled(!bool)
            })
    }, [formState]);

    const handleChange = (e) => {
        const newState = {
            ...formState,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        }
        if(e.target.type !== 'checkbox'){
            validateChange(e.target)
        } 
        setFormState(newState)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('https://reqres.in/api/users', formState)
            .then(res => {
                console.log('POST Res', res)
            })
            .catch(err => {
                console.log(err)
            })
        setFormState(initialState)
    };

    return(
        <PizzaForm onSubmit={handleSubmit}>
            <label>Name</label>
            <input 
                type='text'
                name='name'
                onChange={handleChange}
                data-cy='name-input'
            />
            {errors.name.length > 0 ? <p style={{color:'red'}}>{errors.name}</p> : null}

            <label>Email</label>
            <input 
                type='email'
                name='email'
                onChange={handleChange}
                data-cy='email-input'
            />
            {errors.email.length > 0 ? <p style={{color:'red'}}>{errors.email}</p> : null}

            <label>Size</label>
            <select
                name='size'
                onChange={handleChange}
                data-cy='size'
            >
                <option value=''></option>
                <option value='Small'>Small</option>
                <option value='Medium'>Medium</option>
                <option value='Large'>Large</option>
                <option value='XL'>XL</option>
            </select>
            {errors.size.length > 0 ? <p style={{color:'red'}}>{errors.size}</p> : null}

            <label>Special Instruction</label>
            <textarea 
                type='text'
                name='instructions'
                onChange={handleChange}
                data-cy='instructions-input'
            />
            <Toppings>
                {toppings.map((top, i) => {
                    return (
                        <div key={i}>
                            <label htmlFor={top}>{top}</label>
                            <input 
                                type='checkbox'
                                name={top}
                                onChange={handleChange}
                                data-cy={top}
                            />
                        </div>
                    )
                })}
            </Toppings>

            <button 
                type='submit'
                disabled={disabled}
                data-cy='submit-button'
            >
                Submit Order!
            </button>

        </PizzaForm>
    )
};

export default OrderForm;

const PizzaForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 45%;
    margin: 0 auto;
    border: 1px solid black;
    padding: 25px;
    input{
        width: 100%;
        margin: 10px 0;
    }
    button{
        margin: 5px auto;
    }
`;
const Toppings = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    text-align: center;
    div {
        width: 50%;
    }
`;