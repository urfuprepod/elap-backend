import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mailer/mailer.module';
import { EmailsModule } from './emails/emails.module';
import { MailerModule } from '@nestjs-modules/mailer/dist/mailer.module';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { ResetPasswordRequestsModule } from './reset-password-requests/reset-password-requests.module';
import { VideosModule } from './videos/videos.module';
import { FaqModule } from './faq/faq.module';
import { AdvertismentModule } from './advertisment/advertisment.module';
import { LearnModule } from './learn/learn.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentModule } from './comment/comment.module';
import { PassportModule } from '@nestjs/passport';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    AuthModule,
    EmailsModule,
    UserModule,
    RolesModule,
    // ResetPasswordRequestsModule,
    VideosModule,
    FaqModule,
    AdvertismentModule,
    LearnModule,
    UsersModule,
    TasksModule,
    CommentModule,
    MessagesModule,
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
