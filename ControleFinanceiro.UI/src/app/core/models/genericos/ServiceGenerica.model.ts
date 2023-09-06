import { HttpHeaders } from "@angular/common/http";

export class ServiceGenerica {
  protected token!: string;

  protected get apiAuthorization() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token') as string}`
      }),
    };

    return httpOptions;
  }
}
