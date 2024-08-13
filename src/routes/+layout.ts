import supabase from '$lib/supabase';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
    return { supabase }
}