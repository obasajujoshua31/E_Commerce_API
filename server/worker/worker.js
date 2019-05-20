import queue from '../config/queue';
import sendEmail from './email/email';

queue.on('job enqueue', () => {
    console.log('Job Submitted to the queue');
});


queue.process('send-notification', async (job, done) => {
    await sendEmail(job.data.email, job.data.payload );
    done();
    console.log('Email successfully sent to ', job.data.email);
});

export default queue;
