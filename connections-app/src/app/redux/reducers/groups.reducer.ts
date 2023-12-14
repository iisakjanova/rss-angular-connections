import { createReducer, on } from '@ngrx/store';

import * as GroupsActions from '../actions/groups.actions';
import { GroupsState, initialGroupsState } from '../state/groups.state';

export const groupsReducer = createReducer(
  initialGroupsState,
  on(
    GroupsActions.getGroups,
    (state): GroupsState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(GroupsActions.getGroupsSuccess, (state, { response }): GroupsState => {
    const normalizedData = response.Items.map(item => ({
      id: item.id.S,
      name: item.name.S,
      createdAt: item.createdAt.S,
      createdBy: item.createdBy.S,
    }));

    return {
      ...state,
      items: normalizedData,
      loading: false,
      error: null,
    };
  }),
  on(
    GroupsActions.getGroupsFailure,
    (state, error): GroupsState => ({
      ...state,
      loading: false,
      error,
    })
  ),
  on(
    GroupsActions.createGroup,
    (state): GroupsState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    GroupsActions.createGroupSuccess,
    (state, { response }): GroupsState => ({
      ...state,
      items: [
        ...state.items,
        {
          id: response.groupID,
          name: response.name,
          createdAt: response.createdAt,
          createdBy: response.createdBy,
        },
      ],
      loading: false,
      error: null,
    })
  ),
  on(
    GroupsActions.createGroupFailure,
    (state, error): GroupsState => ({
      ...state,
      loading: false,
      error,
    })
  )
);
