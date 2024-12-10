// pages/index.js
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Hoşgeldiniz!</h1>
            <p>Kitap Okuma Platformuna Hoşgeldiniz</p>

            <Link href="/books">
                <a>Kitapları Görüntüle</a>
            </Link>
        </div>
    );
}
