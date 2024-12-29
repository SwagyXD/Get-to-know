<?php

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Broadcast;
use App\Models\User;
use Illuminate\Support\Facades\Log;

Broadcast::channel('online', function (User $user) {
    return $user ? new UserResource($user) : null;
});

Broadcast::channel('message.user.{userId1}-{userId2}', function (User $user, int $userId1, int $userId2) {
    Log::info('Authenticating user channel', ['user' => $user->id, 'userId1' => $userId1, 'userId2' => $userId2]);
    return $user->id === $userId1 || $user->id === $userId2 ? $user : null;
});

Broadcast::channel('message.group.{groupId}', function (User $user, int $groupId) {
    Log::info('Authenticating group channel', ['user' => $user->id, 'groupId' => $groupId]);
    return $user->groups->contains('id', $groupId) ? $user : null;
});
