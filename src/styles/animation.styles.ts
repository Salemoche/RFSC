export const animation = {
    blinking: `
        @keyframes rfsc_blink {
            from {opacity: 0;}
            to {opacity: 1;}
        }    
    `,
    blinkingInOut: `
        @keyframes rfsc_blink_in_out {
            0% {opacity: 0;}
            25% {opacity: 1;}
            50% {opacity: 0;}
        }    
    `
}