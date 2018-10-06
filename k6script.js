import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 100,
  rps: 2000,
  duration: '1m',
};

export default function() {
  let randomId = Math.floor(Math.random() * 10000000 + 1);
  let res = http.get(`http://localhost:3004/artists/${randomId}`);
  check(res, {
    'status was 200': r => r.status == 200,
    'transaction time OK': r => r.timings.duration < 200,
  });
}
