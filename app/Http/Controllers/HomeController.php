<?php

namespace App\Http\Controllers;

use App\Models\Bien;
use App\Http\Requests\SearchRequest;


class HomeController extends Controller
{
    public function index()
    {
        return Bien::query()->orderBy('id', 'desc')->get();
    }
    public function show(Bien $bien)
    {
        return $bien;
    }
}
