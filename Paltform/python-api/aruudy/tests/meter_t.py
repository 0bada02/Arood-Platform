#!/usr/bin/env python
# -*- coding: utf-8 -*-

#  Copyright 2019 Abdelkrime Aries <kariminfo0@gmail.com>
#
#  ---- AUTHORS ----
#  2019	Abdelkrime Aries <kariminfo0@gmail.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from aruudy.poetry import meter
from aruudy.poetry.meter import Bahr, BahrError

print (meter.name_type(u"كامل"))
print (meter.name_type(u"complete"))

mutadarik = {
        "aname": u"متدارك",
        "ename": "overtaking",
        "trans": "mutadārik",
        "ameter": "",
        "emeter": "S- S- S- S-", # - can be substituted for u u)
        "key": u"حركات المحدث تنتقل  فعلن فعلن فعلن فعل"
}
print (meter.get_bahr("overtaking"))
print (type(meter.get_bahr("overtaking")))
print (meter.get_bahr("overtaking", dic=False))
print (type(meter.get_bahr("overtaking", dic=False)))

print (meter.arabic_names())
