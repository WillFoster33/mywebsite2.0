"use client"

import Image from 'next/image'

export default function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-50">
      <Image
        src="/background/bg2.jpg"
        alt="Background"
        priority
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  )
} 