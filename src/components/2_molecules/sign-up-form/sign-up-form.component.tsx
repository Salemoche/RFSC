import React from 'react'
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import { FormStyles } from '../../../styles/default.styles';
import { useBaseState } from '../../../state/provider';

init("user_glfojhiwXrmPUYfQZxbq0");

function SignUpFormComponent () {

    const styles = useBaseState().state.base.styles;    


    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_8zmn6wi', 'template_7eh3los', e.target, 'user_glfojhiwXrmPUYfQZxbq0')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            alert('Etwas scheint schief gegangen zu sein. Versuche es nocheinmal')
        });
    }

    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        let inputMissing = 0;

        document.querySelectorAll('input').forEach(input => {
            console.log();
            if(input.required && input.value === '') {
                inputMissing += 1;
            }
        })

        if (inputMissing == 0) {
            sendEmail(e);
            alert('Danke für deine Anfrage, wir melden uns in Kürze bei dir!');
        } else {
            console.log('something missing');
        }
    }

    return (
        <FormStyles className="contact-form" onSubmit={handleSubmit} styles={ styles }>
            {/* <input type="hidden" name="contact_number" />
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" /> */}

            <input type="email" name="user_email" required placeholder="Gültige E-Mail Adresse" />
            <input type="date" name="event_date" required min="2021-07-01" max="2021-08-01"/>
            <input type="time" name="event_time" required min="12:00" max="23:59"/>
            <select name="event_type" id="">
                <option value="info@summer-camp.space">Typ 1</option>
                <option value="info@summer-camp.space">Typ 2</option>
                <option value="info@summer-camp.space">Typ 3</option>
                <option value="info@summer-camp.space">Typ 4</option>
            </select>
            <input type="text" required name="event_title" placeholder="Titel (max. 20 Zeichen)" max="20"/>
            <input type="text" required name="event_organizer" placeholder="Wer organisisert den Event? (Person oder Name des Kollektivs/Gruppe)" max="20"/>
            <input type="submit" value="Abschicken" />
        </FormStyles>
    );
}

export default SignUpFormComponent 
