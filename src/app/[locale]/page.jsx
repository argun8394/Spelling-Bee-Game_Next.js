'use client'
import Game from '@/components/game/Game';
import { useParams } from 'next/navigation'

export default function Home() {

  const { locale } = useParams()

  // console.log('router', locale)

  return (
    <main className="flex flex-col items-center justify-between p-24">
      < Game />
    </main>
  );
}
