import { tableSchema } from '@nozbe/watermelondb';

export const page = tableSchema({
  name: 'page',
  columns: [
    { name: 'binder_id', type: 'string', isIndexed: true },
    { name: 'index', type: 'number' }, // 페이지 인덱스
    { name: 'thumbnail_image', type: 'string' }, // 썸네일 이미지 URL
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
    { name: 'is_deleted', type: 'boolean'},
    { name: 'is_starred', type: 'boolean'},
  ],
});
