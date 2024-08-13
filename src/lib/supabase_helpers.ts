import supabase from "$lib/supabase";
import type { Product } from "$lib/types";
import type { Session, User } from "@supabase/supabase-js";

export async function getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("Products_secure")
      .select("*");

    if (error) {
      console.log(error);
      return [];
    } else {
      return data;
    }
  }
  
export async function loginUser(email: string, password: string): Promise<Session | null> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      return null;
    } else {
      return data.session;
    }
  }