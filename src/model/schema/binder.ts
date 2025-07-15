import { tableSchema } from '@nozbe/watermelondb';

export const binder = tableSchema({
  name: 'binder',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'cover_image', type: 'string' }, // 커버 이미지 URL
    { name: 'page_count', type: 'number' }, // 페이지 수
    { name: 'is_deleted', type: 'boolean'}, // 삭제여부
    { name: 'is_archived', type: 'boolean'}, // 보관? 숨김? 여부
    { name: 'is_starred', type: 'boolean'}, // 즐겨찾기 여부
    { name: 'created_at', type: 'number' }, // 생성일
    { name: 'updated_at', type: 'number' }, // 수정일
  ],
});
