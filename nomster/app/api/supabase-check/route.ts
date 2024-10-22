import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email');

    const { data, error } = await supabase
      .from('sign_up')
      .select('id')
      .eq('Email', email);
  
    if (error) {
    console.error('Error checking email:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
    console.log({ exists: data.length > 0 });
    return NextResponse.json({ exists: data.length > 0 });
  }
  