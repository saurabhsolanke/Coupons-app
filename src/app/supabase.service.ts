import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://ijvgmevvtgieeszdhlza.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqdmdtZXZ2dGdpZWVzemRobHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MTE4NDUsImV4cCI6MjA0MDM4Nzg0NX0.K3Syq6a1dNzR3i8kOEkzyTMBbja220mUt26iJegZL5U';
  private supabase: SupabaseClient;
  static supabase: SupabaseClient<any, 'public', any>;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  get client(): SupabaseClient {
    return SupabaseService.supabase;
  }

  async getPosts() {
    const { data, error } = await this.supabase.from('coupons').select('*');
    return data;
  }

  async updateFlag(id: number, flagValue: boolean) {
    const { data, error } = await this.supabase
      .from('coupons')
      .update({ used: flagValue })
      .eq('id', id);
    return data;
  }

  async getTasks() {
    const { data, error } = await this.client.from('coupons').select('*');
    console.log(data);
    return { data, error };
  }
}
