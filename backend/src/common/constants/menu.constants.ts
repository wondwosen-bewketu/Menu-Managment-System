// src/common/constants/menu.constants.ts

export const MENU_CONSTANTS = {
  ERROR_MESSAGES: {
    NOT_FOUND: 'Menu not found',
    PARENT_NOT_FOUND: 'Parent menu not found',
    MAX_DEPTH_EXCEEDED: 'Maximum menu depth exceeded',
    NAME_REQUIRED: 'Menu name is required',
    NAME_MIN_LENGTH: 'Menu name must be at least 2 characters',
    NAME_MAX_LENGTH: 'Menu name cannot be longer than 50 characters',
    INVALID_DEPTH: 'Depth must be a positive integer',
    CIRCULAR_REFERENCE: 'Circular reference detected in menu hierarchy',
    DATABASE_ERROR: 'Database operation failed',
    UPDATE_CONFLICT: 'Menu update conflict occurred',
    DELETE_WITH_CHILDREN: 'Cannot delete menu with existing children',
  },

  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
    MIN_DEPTH: 1,
    MAX_DEPTH: 5,
  },

  DEFAULTS: {
    ROOT_DEPTH: 1,
    DEFAULT_QUERY_DEPTH: 2,
    MAX_CHILDREN_PER_LEVEL: 10,
    PAGINATION_LIMIT: 100,
  },

  API_MESSAGES: {
    CREATE_SUCCESS: 'Menu created successfully',
    UPDATE_SUCCESS: 'Menu updated successfully',
    DELETE_SUCCESS: 'Menu deleted successfully',
    FETCH_SUCCESS: 'Menu data retrieved successfully',
  },

  ORDER: {
    ASC: 'asc',
    DESC: 'desc',
    SORTABLE_FIELDS: ['name', 'depth', 'createdAt'] as const,
  },

  RELATIONS: {
    CHILDREN: 'children',
    PARENT: 'parent',
  },

  CACHE: {
    TTL: 60 * 60, // 1 hour
  },
};

export type MenuSortableFields =
  (typeof MENU_CONSTANTS.ORDER.SORTABLE_FIELDS)[number];
