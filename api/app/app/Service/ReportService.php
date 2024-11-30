<?php

namespace App\Service;

use App\Models\Report;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;


class ReportService
{
  /**
   * 部署に所属する全てのユーザーの報告書を取得する
   * @param string $userId
   * @param array $conditions // 検索条件
   * @return LengthAwarePaginator
   */
  public function getCrewsReportsList(string $userId, array $conditions): LengthAwarePaginator
  {
    $query = Report::where('manager_id', $userId);
    
    // 検索条件がある場合は追加
    if ($conditions['start_date'] && $conditions['end_date']) {
      $query->whereBetween('created_at', [$conditions['start_date'], $conditions['end_date']]);
    }

    return $query->orderBy('created_at', 'desc')
                ->with(['user'])
                ->paginate(10);
  }

  /**
   * 自分の報告書を取得する
   * @param string $userId
   * @param array $conditions // 検索条件
   * @return LengthAwarePaginator
   */
  public function getOwnReportList(string $userId, array $conditions): LengthAwarePaginator
  {
    $query = Report::where('user_id', $userId);
    // 検索条件がある場合は追加
    if ($conditions['start_date'] && $conditions['end_date']) {
      $query->whereBetween('created_at', [$conditions['start_date'], $conditions['end_date']]);
    }

    return $query->orderBy('created_at', 'desc')
                ->with(['user'])
                ->paginate(10);
  }
}