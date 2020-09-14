import Link from 'next/link'
import React from 'react'
import { HelloWorld } from './HelloWorld'

export default function IndexPage() {
  return (
    <div>
      <div className="py-20">
        <Link href="sandbox/mxgraph/index.html">
          <a>mxgraph examples</a>
        </Link>
      </div>

      <div className="py-20">
        <HelloWorld />
      </div>
    </div>
  )
}
