import http from 'k6/http';
import {sleep} from 'k6';

const EC2_PUBLIC_IP = 'traffic-elb-981235902.ap-northeast-2.elb.amazonaws.com';

export const options = {
    stages: [
        // { duration: '1s', target: 1000 }, // 1초 동안 1000명의 사용자
        // { duration: '1m', target: 10000 },  // 1분 동안 10000명의 사용자
        // 스파이크 부하 테스트
        // { duration: '10s', target: 1000 }, // 10초 동안 1,000명
        // { duration: '30s', target: 5000 }, // 30초 동안 5,000명
        // { duration: '10s', target: 0 },    // 10초 동안 사용자 수 감소
        // 점진적 부하 테스트
        // { duration: '10s', target: 100 },   // 10초 동안 100명
        // { duration: '20s', target: 500 },  // 20초 동안 500명
        // { duration: '30s', target: 1000 }, // 30초 동안 1,000명
        // { duration: '1m', target: 2000 },  // 1분 동안 2,000명
        // { duration: '1m', target: 3000 },  // 1분 동안 3,000명
        // 지속 부하 테스트
        { duration: '5m', target: 1000 },  // 5분 동안 1,000명 유지
    ],
    thresholds: {
        // http_req_duration: ['p(95)<500'], // 95% 요청은 500ms 이내
        http_req_duration: ['p(95)<1000'], // 95% 요청은 1s 이내
    },
};

export default function () {
    const url = `http://${EC2_PUBLIC_IP}/traffic`
    const res = http.get(url);
    sleep(1);
}