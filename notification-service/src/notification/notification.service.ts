import {Injectable, Logger} from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { ResultDto } from './dto/result.dto';
import axios from 'axios';


@Injectable()
export class NotificationService{
     private readonly logger = new Logger(NotificationService.name);
     
onModuleInit() {
    this.logger.log('NotificationService module initialized');

    // Optional: Validate required environment variables
    const requiredEnv = ['USER_SERVICE_URL', 'EMAIL_USER', 'EMAIL_PASS'];
    requiredEnv.forEach((key) => {
      if (!process.env[key]) {
        this.logger.warn(`Environment variable ${key} is not defined`);
      }
    });
  }

    async sendResultEmail(payload:ResultDto):Promise<void>{
      const{
        studentId,
        studentName,
        marks,
        total,
        grade
      } = payload;

      const userServiceUrl = process.env.USER_SERVICE_URL;
      if(!userServiceUrl){
        throw new Error('USER_SERVICE_URL is not defined');
      }
      console.log(`Fetching student from: ${userServiceUrl}/user/student/${studentId}`);

      const response = await axios.get(`${userServiceUrl}/user/student/${studentId}`);
      const student = response.data;
      if(!student?.email){
      this.logger.warn(`No email found for studentId: ${studentId}`);
      return;

      }
      const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
              user:process.env.EMAIL_USER,
              pass:process.env.EMAIL_PASS
            }
          });
          await transporter.sendMail({
            from:`"Exam portal"<${process.env.EMAIL_USER}>`,
            to:student.email,
            subject:'your Exam Result is Available',
            
          html:`<p>Hello <strong> ${studentName} </strong>,</p>
          <p>Your result is <strong>${marks}/${total}</strong>
          (Grade:<strong>${grade}</strong>).</p>
          <p>Best regards,<br/>Exam Portal </p>`,

          })

this.logger.log(`Result email sent to ${student.email}`);

    }
       
}


