import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { JoinComponent } from './join/join.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path: '', component: JoinComponent},
  {path: 'chat', component: ChatComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    JoinComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxAutoScrollModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
