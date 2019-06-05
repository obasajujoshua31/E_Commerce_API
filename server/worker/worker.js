import queue from '../config/queue';
import sendEmail from './email/email';

/**
 * @description This prints to the console that a job that has been received by the queue engine
 */
queue.on('job enqueue', () => {
    console.log('Job Submitted to the queue');
});

/**
 * @description This picks a 
 * send-notification event and 
 * send email to the email with the payload supplied
 */
queue.process('send-notification', async (job, done) => {
    await sendEmail(job.data.email, job.data.payload );
    done();
    console.log('Email successfully sent to ', job.data.email);
});


export default queue;
