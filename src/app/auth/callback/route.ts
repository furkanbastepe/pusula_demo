import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/baslangic'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Check if user has completed onboarding
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                // Check if profile exists and has completed onboarding
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('id, cohort_id')
                    .eq('id', user.id)
                    .single()

                // If profile has cohort, go to panel; otherwise go to onboarding
                const redirectTo = profile?.cohort_id ? '/panel' : '/baslangic'
                return NextResponse.redirect(`${origin}${redirectTo}`)
            }

            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // Return to login on error
    return NextResponse.redirect(`${origin}/giris?error=auth_error`)
}
