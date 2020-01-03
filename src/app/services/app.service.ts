import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class AppService {

	getData () {
		return this.http.get('https://api.github.com/emojis')
	}

	constructor(private http: HttpClient) {

	}
}
