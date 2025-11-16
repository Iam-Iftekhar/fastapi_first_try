import './globals.css'
import Providers from '../components/Providers'


export const metadata = {
title: 'Simple Social',
description: 'A lightweight social feed',
}


export default function RootLayout({ children }) {
return (
<html lang="en">
<body>
<Providers>
<main>{children}</main>
</Providers>
</body>
</html>
)
}