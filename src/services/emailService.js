import emailjs from 'emailjs-com';

const sendEmail = (templateParams, templateId) => {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId,
    templateParams,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};

export default sendEmail; 