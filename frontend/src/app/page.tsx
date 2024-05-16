'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function Home() {
  function hanleClick() {
    axios.post('http://127.0.0.1:8000/api/').then(console.log);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={hanleClick}>Click Me</Button>
    </main>
  );
}
