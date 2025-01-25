<?php

namespace App\Service;

use App\Models\User;
use Illuminate\Support\Collection;

class UserService
{
  /**
   * 所属する部署の管理者情報を取得する
   * @param array $user
   * @return User
   */
  public function getManager(array $user): User
  {
    return User::where('role', config('const.common.ROLE.MANAGER'))
                ->where('department', $user['department'])
                ->first();
  }

  /**
   * 所属する部署のユーザー情報を全て取得する
   * @param array $user
   * @return Collection
   */
  public function getCrews(array $user): Collection
  {
    return User::where('department', $user['department'])
                ->where('role', '!=', config('const.common.ROLE.MANAGER'))
                ->get();
  }
}