import React, { Component } from 'react'
import validator from 'validator';

class FormValidator extends Component {
    constructor(rules) {
        // rules is an array of rules specific to a form
        this.rules = rules;
    }
    // create a validation object for a valid form
    valid = ()=> {
        const validation = {}
        
        this.rules.map(rule => (
            validation[rule.field] = { isInvalid: false, message: '' }
        ));
        return { isValid: true, ...validation };
    }
    validate = (state)=> {
        // state =  { email: 'loony tunes', age: 19}
        // start out assuming valid
        let validor = this.valid();
        // for each validor rule
        this.rules.forEach(rule => {
        
            // determine the field value, the method to invoke and
            // optional args from the rule definition
            const field_value = state[rule.field];
            const args = rule.args || [];
            const validation_method = typeof rule.method === 'string' ? validator[rule.method] : rule.method
            // call the validation_method with the current field value
            // as the first argument, any additional arguments, and the
            // whole state as a final argument.  If the result doesn't
            // match the rule.validWhen property, then modify the
            // validation object for the field and set the isValid
            // field to false
            if(validation_method(field_value, ...args, state) != rule.validWhen) {
              validor[rule.field] = { 
                isInvalid: true, 
                message: rule.message 
              }
              validor.isValid = false;
            }
          }
        );
        return validation;
    }

}

export default FormValidator