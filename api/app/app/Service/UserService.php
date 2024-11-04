<?php

namespace App\Service;

use App\Models\User;

class UserService
{
  /**
   * 所属する部署の管理者情報を取得する
   * @param User $user
   * @return User
   */
  public function getManager(User $user): User
  {
    return User::where('role', config('const.common.ROLE.MANAGER'))
                ->where('department', $user->department)
                ->get();
  }

  /**
   * 所属する部署のユーザー情報を全て取得する
   * @param User $user
   * @return User
   */
  public function getCrews($user): User
  {
    return User::where('department', $user->department)
                ->where('role', '!=', config('const.common.ROLE.MANAGER'))
                ->get();
  }
}