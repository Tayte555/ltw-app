import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [NgIf, NgFor],
  standalone: true,
})
export class HomeComponent implements OnInit {
  user: any;
  matchData: any[] = [];
  matchesByGameweek: { [key: number]: any[] } = {};

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error('Failed to load user:', err);
      },
    });

    this.apiService.getPLMatchData().subscribe({
      next: (data: any) => {
        console.log('API data:', data); // see it in console
        this.matchData = data.matches || data; // adjust if the API returns { matches: [...] }
      },
      error: (err) => console.error('Error fetching matches:', err),
    });

    this.apiService.getPLMatchData().subscribe({
      next: (data: any) => {
        const matches = data.matches || data;

        // group matches by gameweek / matchday
        matches.forEach((match: any) => {
          const gw = match.matchday; // or match.gameweek depending on API
          if (!this.matchesByGameweek[gw]) {
            this.matchesByGameweek[gw] = [];
          }
          this.matchesByGameweek[gw].push(match);
        });
      },
      error: (err) => console.error('Error fetching matches:', err),
    });
  }

  getGameweeks(): number[] {
    // return sorted gameweeks
    return Object.keys(this.matchesByGameweek)
      .map((k) => +k)
      .sort((a, b) => a - b);
  }
}
