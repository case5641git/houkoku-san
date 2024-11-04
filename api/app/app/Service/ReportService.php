<?php

namespace App\Service;

use App\Models\Report;

class ReportService
{
  /**
   * 部署に所属する全てのユーザーの報告書を取得する
   * @param int $userId
   * @return Report
   */
  public function getCrewsReportsList(int $userId): Report
  {
    return Report::where('manager_id', $userId)
                    ->orderBy('created_at', 'desc')
                    ->get();
  }

  /**
   * 自分の報告書を取得する
   * @param int $userId
   * @return Report
   */
  public function getOwnReportList(int $userId): Report
  {
    return Report::where('user_id', $userId)
                                ->get();
  }
}