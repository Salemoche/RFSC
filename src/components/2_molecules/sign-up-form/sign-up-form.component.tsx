import React from 'react'
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';

init("user_glfojhiwXrmPUYfQZxbq0");

function SignUpFormComponent () {

    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_8zmn6wi', 'template_7eh3los', e.target, 'user_glfojhiwXrmPUYfQZxbq0')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    return (
        <form className="contact-form" onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
        </form>
    );
}

export default SignUpFormComponent 
