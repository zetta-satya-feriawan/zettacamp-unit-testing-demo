import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ExploreComponent } from './explore/explore.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'explore',
    pathMatch: 'full',
    component: ExploreComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
