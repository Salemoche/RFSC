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
            <input type="email" name="user_email" required placeholder="Gültige E-Mail Adresse" />
            <input type="date" name="event_date" required min="2021-07-01" max="2021-08-01"/>
            <input type="time" name="event_time" required min="12:00" max="23:59"/>
            <input type="text" required name="event_title" placeholder="Titel der Veranstaltung (max. 20 Zeichen)" max={20}/>
            <input type="text" required name="event_organizer" placeholder="Wer organisiert die Veranstaltung? (Privatpersonen/Name des Kollektivs)"/>
            <input type="email" name="contact_email" required placeholder="E-Mail der Ansprechsperson" />
            <label htmlFor="contact_phone">Telefonnummer der Ansprechsperson</label>
            <input type="tel" name="contact_phone" id="" />
            <select name="event_location" id="">
                <option value="default">Veranstaltungsort in der Roten Fabrik</option>
                <option value="courtyard">Innenhof / (nur ruhige Veranstaltungen)</option>
                <option value="foyer">Foyer</option>
                <option value="shedhalle">Shedhalle</option>
                <option value="radio-Box">Radio-Box</option>
                <option value="clubraum">Clubraum</option>
            </select>
            <div className="event_types rfsc-checkbox-container">
                <label htmlFor="event_types">Art der Veranstaltung</label>
                {/* <input type="checkbox" name="event_types[]" value="default">Art der Veranstaltung</input> */}
                <input type="checkbox" name="event_types[]" value="art"/><span className="rfsc-checkbox-label">Kunst (Ausstellung / Performance)</span>
                <input type="checkbox" name="event_types[]" value="discourse"/><span className="rfsc-checkbox-label">Diskurs</span>
                <input type="checkbox" name="event_types[]" value="workshop"/><span className="rfsc-checkbox-label">Workshop (Wissenstransfer)</span>
                <input type="checkbox" name="event_types[]" value="tattoo"/><span className="rfsc-checkbox-label">Tattoo</span>
                <input type="checkbox" name="event_types[]" value="action"/><span className="rfsc-checkbox-label">Aktion</span>
                <input type="checkbox" name="event_types[]" value="radio"/><span className="rfsc-checkbox-label">Radio</span>
                <input type="checkbox" name="event_types[]" value="concert"/><span className="rfsc-checkbox-label">Konzert</span>
                <input type="checkbox" name="event_types[]" value="club"/><span className="rfsc-checkbox-label">Club</span>
            </div>
            <textarea 
                name="event_description" 
                id="" 
                cols={10} 
                rows={10}
                maxLength={1500}
                placeholder="Short description of your event (800–1500 characters incl. word spaces) // Kurzbeschrieb der Veranstaltung (800–1500 Zeichen mit Leerschlägen)"
            ></textarea>
            <input type="text" required name="event_performers" placeholder="Involved artists, guests, performers // Involvierte Künstler*innen, Gäste*, Performer*innen"/>
            <textarea 
                name="event_timetable" 
                id="" 
                cols={10} 
                rows={10}
                placeholder="Timetable of your event (for example: Maxime Muster – 12:00–13:00, Anna Beispiel – 13:00–14:30) // Zeitplan für dein Event (zB.: Maxime Muster – 12:00–13:00, Anna Beispiel – 13:00–14:30)"
            ></textarea>
            <div className="event_techrider rfsc-checkbox-container">
                <label htmlFor="event_techrider">Technische Bedürfnisse (nur im Clubraum)</label>
                <input type="checkbox" name="event_techrider[]" value="2_point_meyer"/><span className="rfsc-checkbox-label">2-point Meyer-Soundsystem</span>
                <input type="checkbox" name="event_techrider[]" value="4_point_meyer"/><span className="rfsc-checkbox-label">4-point Meyer-Soundsystem</span>
                <input type="checkbox" name="event_techrider[]" value="dj_etup"/><span className="rfsc-checkbox-label">DJ-Setup: Pioneer DJM 900 nxs, 2 Pioneer CDJ 2000 nxs2, 2 Pioneer PLX1000, Monitoring</span>
                <input type="checkbox" name="event_techrider[]" value="funk-mik/s"/><span className="rfsc-checkbox-label">4 Funk-Miks</span>
                <input type="checkbox" name="event_techrider[]" value="stereo-i/n"/><span className="rfsc-checkbox-label">Stereo-In (Plug-Ins)</span>
                <input type="checkbox" name="event_techrider[]" value="beamer"/><span className="rfsc-checkbox-label">Beamer & screen // Leinwand</span>
                <input type="checkbox" name="event_techrider[]" value="printer"/><span className="rfsc-checkbox-label">s/w-Drucker</span>
                <input type="checkbox" name="event_techrider[]" value="light_discourse"/><span className="rfsc-checkbox-label">Licht-Preset 'Diskurs'</span>
                <input type="checkbox" name="event_techrider[]" value="light_club"/><span className="rfsc-checkbox-label">Club-Licht-Preset</span>
                <input type="checkbox" name="event_techrider[]" value="stools"/><span className="rfsc-checkbox-label">Sitzhocker & Stühle</span>
                <input type="checkbox" name="event_techrider[]" value="backstage"/><span className="rfsc-checkbox-label">Backstage</span>
            </div>
            <input name="organizer_instagram" placeholder="Instagram-handles zum Taggen aller involvierten Personen in Instagram-Posts & -Stories plus SC-Account)"/>
            <textarea 
                name="event_specials" 
                id="" 
                cols={10} 
                rows={10}
                placeholder="Specials"
            ></textarea>
            <input type="submit" value="Abschicken" />
        </FormStyles>
    );
}

export default SignUpFormComponent