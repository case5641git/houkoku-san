<?php

namespace App\Service;

use App\Models\Report;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
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
    
    // 日時検索条件がある場合は追加
    if (($conditions['start_date'] != "") && ($conditions['end_date'] != "")) {
      $query->whereBetween('created_at', [$conditions['start_date'], $conditions['end_date']]);
    }

    // ユーザーが指定されたら条件を追加
    if ($conditions['user_id'] != "") {
      $query->where('user_id', $conditions['user_id']);
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
    if (($conditions['start_date'] != "") && ($conditions['end_date'] != "")) {
      $query->whereBetween('created_at', [$conditions['start_date'], $conditions['end_date']]);
    }

    return $query->orderBy('created_at', 'desc')
                ->with(['user'])
                ->paginate(10);
  }

  /**
   * 報告書の作成
   * @param array $data
   * @return interger
   */
  public function createReport(array $data): int
  {
    $report = new Report();
    $userId = Auth::id();
    $managerId = User::where('role', config('const.common.ROLE.MANAGER'))
                      ->where('department', Auth::user()->department)
                      ->first()->id;
    $report->fill([
        'user_id' => $userId,
        'manager_id' => $managerId,
        'reserver_num' => $data["reserver_num"],
        'visitor_num' => $data["visitor_num"],
        'reserver_contractor_num' => $data["reserver_contractor_num"],
        'visitor_contractor_num' => $data["visitor_contractor_num"],
        'sales' => $data["sales"],
        'customer_feedback' => $data["customer_feedback"],
        'crew_feedback' => $data["crew_feedback"],
    ]);
    $report->save();
    return $report->id;
  }

  /**
   * 報告書の詳細を取得
   * @param int $id
   * @return array
   */
  public function findById(int $id): array
  {
    return Report::find($id)->toArray();
  }

  /**
   * 報告書の編集
   * @param array $data
   * @param int $id
   * @return void
   */
  // public function editReport(array $data, int $id):void
  // {
  //   $report = Report::find($id);
  //   $report->fill([
  //     'reserver_num' => $data["reserver_num"],
  //     'visitor_num' => $data["visitor_num"],
  //     'sales' => $data["sales"],
  //     'customer_feedback' => $data["customer_feedback"],
  //     'crew_feedback' => $data["crew_feedback"],
  //   ]);
  //   $report->save();
  // }
}