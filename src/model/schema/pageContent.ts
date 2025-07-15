import { tableSchema } from '@nozbe/watermelondb';

export const pageContent = tableSchema({
  name: 'page_content',
  columns: [
    { name: 'type', type: 'string' }, // 타입 정의는 모델에서 가능할 거 같음, 스티커 / 텍스트 등등
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' },
    { name: 'x_position', type: 'number' },
    { name: 'y_position', type: 'number' },
    { name: 'index', type: 'number' }, // 에디터 초기화시에만 쓰고 내부에선 배열로 제어할지 고민
    { name: 'rotation', type: 'number' },
    { name: 'scale', type: 'number' }, // width,height 있으면 필요없을지도 ? 에디터에 좀 그려봐야 알듯
    { name: 'opacity', type: 'number' },
    { name: 'parent_id', type: 'string', isIndexed: true },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
    { name: 'is_deleted', type: 'boolean'},
  ],
});
