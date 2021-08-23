```js
import dayjs from 'dayjs/esm';
import relativeTime from 'dayjs/esm/plugin/relativeTime/index.js';
import utc from 'dayjs/esm/plugin/utc/index.js';

dayjs.extend(relativeTime);
dayjs.extend(utc);
```
