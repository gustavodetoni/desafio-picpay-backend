import { Injectable } from '@nestjs/common';
import { AuthorizationService } from '@/domain/application/repositories/authorization.repository';

@Injectable()
export class HttpAuthorizationService implements AuthorizationService {
  async authorize(): Promise<boolean> {
    try {
      const response = await fetch('https://util.devi.tools/api/v2/authorize', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to authorize: HTTP status', response.status);
        return false;
      }

      const data = await response.json(); 
      return data.message === 'Autorizado';
    } catch (error) {
      console.error('Failed to authorize:', error);
      return false;
    }
  }
}
