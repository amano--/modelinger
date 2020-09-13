import Link from 'next/link'

export default function IndexPage() {
  return (
    <div>
      <div className="py-20">
        <Link href="sandbox/mxgraph/index.html">
          <a>mxgraph examples</a>
        </Link>
      </div>
    </div>
  )
}
