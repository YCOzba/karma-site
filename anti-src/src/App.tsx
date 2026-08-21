import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

export default function App() {
  const [loud, setLoud] = useState(true)
  const [clicks, setClicks] = useState(0)

  return (
    <div className="min-h-screen overflow-x-hidden px-5 pt-6 pb-24 sm:px-8">
      {/* ---- top bar: the back link, shouted ---- */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a
          href="/"
          className="border-4 border-border bg-volt px-4 py-2 text-lg font-black tracking-tight text-white shadow-hard transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:px-6 sm:py-3 sm:text-2xl"
        >
          ← GERİ
        </a>
        <Badge className="rotate-3 border-4 bg-sun px-3 py-1 text-sm font-black text-black shadow-hard sm:text-base">
          BOZUK KÖŞE
        </Badge>
      </div>

      {/* ---- the shouting ---- */}
      <header className="relative mx-auto mt-12 max-w-6xl sm:mt-20">
        <h1 className="text-[19vw] leading-[0.76] font-black tracking-tighter uppercase sm:text-[15vw]">
          <span className="block -rotate-2">ANTİ</span>
          <span
            className="-mt-[0.06em] block translate-x-2 rotate-1 text-red sm:translate-x-10"
            style={{ WebkitTextStroke: '3px #000' }}
          >
            ESTETİK
          </span>
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
          <Badge className="-rotate-2 border-4 bg-volt px-3 py-1 text-sm font-black text-white shadow-hard">
            DENEY #01
          </Badge>
          <Badge className="rotate-2 border-4 bg-white px-3 py-1 text-sm font-black text-black shadow-hard">
            NEOBRUTALIZM
          </Badge>
          <Badge className="-rotate-1 border-4 bg-sun px-3 py-1 text-sm font-black text-black shadow-hard">
            GRİD YOK
          </Badge>
        </div>

        {/* intro, deliberately knocked off the grid */}
        <div className="mt-10 max-w-2xl -rotate-1 border-4 border-border bg-white p-5 shadow-hardlg sm:ml-12 sm:p-7">
          <p className="text-lg leading-snug font-bold sm:text-2xl">
            Burası sitenin <span className="bg-red px-1 text-white">dağınık köşesi</span>.
            Girişteki sakin şoji kapısının tam tersi: kalın siyah çerçeveler,
            sert gölgeler, birbiriyle kavga eden renkler ve bilerek bozulmuş
            bir grid. Buradaki hiçbir şey uyumlu olmaya çalışmıyor.
          </p>
        </div>
      </header>

      {/* ---- the component showcase ---- */}
      <main className="mx-auto mt-20 grid max-w-6xl gap-8 sm:mt-28 sm:grid-cols-2 lg:grid-cols-3">
        {/* buttons */}
        <Card className="rotate-1 border-4 bg-white shadow-hardlg">
          <CardHeader>
            <CardTitle className="text-3xl font-black uppercase">Düğmeler</CardTitle>
            <CardDescription className="text-base font-bold">
              Bas, gölgesinin altına kaçsın.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button
              onClick={() => setClicks((c) => c + 1)}
              className="border-4 text-base font-black uppercase shadow-hard"
            >
              Bana bas
            </Button>
            <Button
              variant="neutral"
              className="border-4 text-base font-black uppercase shadow-hard"
            >
              Nötr
            </Button>
            <Button
              variant="reverse"
              className="border-4 bg-volt text-base font-black text-white uppercase"
            >
              Ters
            </Button>
          </CardContent>
          <CardFooter>
            <span className="border-4 border-border bg-sun px-3 py-1 text-base font-black">
              {clicks} kez basıldı
            </span>
          </CardFooter>
        </Card>

        {/* card + switch */}
        <Card className="-rotate-2 border-4 bg-sun shadow-hardlg sm:mt-10">
          <CardHeader>
            <CardTitle className="text-3xl font-black uppercase">Anahtar</CardTitle>
            <CardDescription className="text-base font-bold">
              Kapatabilirsin ama bir şey değişmez.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Switch
              checked={loud}
              onCheckedChange={setLoud}
              className="h-8 w-16 border-4 [&>[data-slot=switch-thumb]]:h-5 [&>[data-slot=switch-thumb]]:w-5 [&>[data-slot=switch-thumb]]:data-[state=checked]:translate-x-9"
            />
            <span className="text-2xl font-black uppercase">
              {loud ? 'AÇIK' : 'kapalı'}
            </span>
          </CardContent>
          <CardFooter>
            <p className="text-base font-bold">
              {loud
                ? 'Ses sonuna kadar açık.'
                : 'Yine de bağırmaya devam ediyor.'}
            </p>
          </CardFooter>
        </Card>

        {/* badges / tags */}
        <Card className="rotate-2 border-4 bg-volt text-white shadow-hardlg sm:-mt-6">
          <CardHeader>
            <CardTitle className="text-3xl font-black text-white uppercase">
              Etiketler
            </CardTitle>
            <CardDescription className="text-base font-bold text-white">
              Hepsi farklı açıda, bilerek.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {[
              { t: 'ham', bg: '#ff8a00', fg: '#000' },
              { t: 'çirkin', bg: '#ff2e2e', fg: '#fff' },
              { t: 'yüksek sesli', bg: '#ffffff', fg: '#000' },
              { t: 'düzeltilmedi', bg: '#4da6ff', fg: '#000' },
              { t: 'taslak', bg: '#ff8a00', fg: '#000' },
            ].map(({ t, bg, fg }, i) => (
              <Badge
                key={t}
                className="border-4 px-3 py-1 text-sm font-black shadow-hard"
                style={{
                  transform: `rotate(${(i % 2 ? 1 : -1) * (2 + i)}deg)`,
                  background: bg,
                  color: fg,
                }}
              >
                {t}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </main>

      {/* ---- a strip that runs off the edge on purpose ---- */}
      <div className="mt-24 -mr-10 -ml-10 -rotate-1 border-y-4 border-border bg-red py-4">
        <p className="text-center text-3xl font-black tracking-tight whitespace-nowrap text-white uppercase sm:text-5xl">
          ★ DÜZGÜN DEĞİL ★ DÜZELTİLMEYECEK ★ DÜZGÜN DEĞİL ★ DÜZELTİLMEYECEK ★
        </p>
      </div>

      <footer className="mx-auto mt-16 max-w-6xl">
        <p className="text-sm font-bold uppercase">
          karma · anti — bileşenler{' '}
          <a
            className="bg-black px-1 text-sun underline"
            href="https://github.com/ekmas/neobrutalism-components"
            target="_blank"
            rel="noreferrer"
          >
            ekmas/neobrutalism-components
          </a>{' '}
          (MIT)
        </p>
      </footer>
    </div>
  )
}
