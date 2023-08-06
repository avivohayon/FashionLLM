
import requests
colors_set = {
            'White', 'Black', 'Blue', 'Multi', 'Green', 'Neutral', 'Pink',
            'Brown', 'Navy', 'Orange', 'Red', 'Purple', 'Grey', 'Yellow',
            'Silver', 'Gold', 'Copper', 'No colour', 'Auburn',
            'Khaki'
              }


def init_shein_request_metadata(product: str, colors: list[str], gender: str) -> tuple[dict, dict, dict]:
    # gender = 202 if gender == 'Men' else 443
    # if  inst_res:
    #     print("hello")
    #     return
    product = product + ' ' + gender
    print(f'new product is: {product}')
    # print(f'new product is: {product}')
    # if  inst_res:
    #     print("hello")
    #     return
    #
    # if product == "Fedora hats hat Men":
    #     print("Fedora hats hat Men")
    #
    # if product == {'Fedora hats hat Men'}:
    #     print("SET of Fedora hats hat Men")
    cookies = {
        'cookieId': 'C3EB5523_FD86_E2D4_7D1C_B9DFEFB535C3',
        'originOtherId': '2582776306',
        'country': 'IL',
        'countryId': '105',
        '_gcl_aw': 'GCL.1687094185.Cj0KCQjw1rqkBhCTARIsAAHz7K386HraqSIwpSztVjfoHoWFDcJHroP-p9fBYijcSk8cTzb78tAx-zEaAo86EALw_wcB',
        '_gcl_au': '1.1.433664629.1687094185',
        'language': 'en',
        'cdn_key': 'illang%3Dilen',
        'sessionID_shein': 's%3AsE-8cxXOv-ubS3ZqpeuvmPMNN5yzuw9P.1smA7Apm4RbJ1hLnx4YUBC5xPea%2FQJLHml8YaOnR1oI',
        'RESOURCE_ADAPT_WEBP': '1',
        'WEB_UGID_INIT': '1',
        '_csrf': 'Ew5vYWmDMHbt92FurFJk9WAL',
        'revisit_canshow': '1',
        'have_show': '1',
        'jump_to_il': '1',
        'no_pop_up_il': '1',
        'hideCoupon': '1',
        'hideCouponWithRequest': '1',
        'hideCouponId_time': '9051915_1',
        'SWITCH_LANGUAGE_GUIDE_ID': 'C3EB5523_FD86_E2D4_7D1C_B9DFEFB535C3',
        'smidV2': '20230707160117f02cb9f015510e88e2e71a98cc6d95e1000e717a9eb311090',
        'cate_channel_type': '2',
        'ssrAbt': 'typeBtype%3DAtype%3DBrule%3D1727_1766_767%3ABis_pde%3D3%26rule_id_120%3Drec_ver%3AS120V3.0%26rule_id_121%3Drec_ver%3AS121V2.1ZrangedetailtypelALogisticsTimeASizeTipsBUnderPriceFeedsoffUnderPriceShowASameLabelbannerConnetlabelAGroupsameA3PsellerdeliveryshowdetailshowsellerinfonoshowgoodsPicAbBdiscountLabelcallnolimitstoreyesReportshowhideMall_1',
        'RESOURCE_ADAPT_DEVICE': 'width%3D1920%26height%3D1080%26dpr%3D1%26mobile%3D0%26ios%3D0',
        'OptanonConsent': 'isIABGlobal=false&datestamp=Fri+Jul+07+2023+16%3A33%3A15+GMT%2B0300+(Israel+Daylight+Time)&version=6.13.0&hosts=&consentId=9db75548-292e-4bcf-a6d1-da714e728314&interactionCount=1&landingPath=https%3A%2F%2Fus.shein.com%2FSHEIN-EZwear-Solid-Elastic-Waist-Slant-Pocket-Sweatpants-p-3308015-cat-2990.html&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1',
        'addressCookie': '%7B%22countryId%22%3A%22105%22%2C%22createdTime%22%3A1688739277076%2C%22isUserHandle%22%3A%221%22%2C%22siteUid%22%3A%22il%22%7D',
        '_abck': 'A4D5003E71B47CDD0A0237FFCC9836FC~0~YAAQpWQRAjL7XQSJAQAAX2xCNQrdl0kgUBwwnHeaXAL6hGvPZ2iSXaxz0wBIWmk9z0A2KqAB5Le91u+QkElWLCU8M1TRQP0M7j7R/SOpwv0D8rROol/Cy/0W4DhiQr4shbrfIbslRRX0NrTDjtMRwhJsGQ4sy6PnHbiV3lKjrqks5cqaNqhFVIALIYwOmU9aumrFvwtiDAGYigedbajnaN1NaCTDWRl+JzAq/Cjd3T2ulrGTu4lJ+EYP/mpsIoju0fau4MMgVPkln7g9ReoI6ISVT89PfjM38CRtJoqzTFVsgtJNrgdqA28kdCFjvTDqQI5g9rJj7sittiXidx6f5jj0nLo+EWqNTzLaRUEoAAlrTSCTHJInSBo8o/bbTa92Ik69fNapXtfgIZ4/yDHHWFvxiGJOdXE=~-1~-1~-1',
        'bm_sz': 'BCE8DF6D0492A8464F4985A2861C6ED6~YAAQpWQRAjX7XQSJAQAAX2xCNRR45oN8gWTCLvOOZFh+tgkGMjZDJ2C/g9IMpblHAb0VoHRms7nJkpuPLOSWJYGXgG2B0Yr5ZGjF34aug+pY56sG38WjtbgyOfSq3gB8JoAjuhAKJosh6KZTbgLo7HxN2CnC7oB4Jc9r+VjEX0UW1rBPLutyMSR7aNtU8xF5mtfMJ+hGYzWN3Y4g6LYSMa/SHXByoXRQevADyVkdNeQ4hUE6hbmY2z0KVUY8uM6nXIwvQO65GPalAMuId08NmItIZw2o0lO2+2McmoX+FtAB7g==~3289409~3556145',
        'bi_session_id': 'bi_1688815954957_54547',
        'default_currency_expire': '1',
        'ftr_blst_1h': '1688815957320',
        'bm_mi': '831891F7F2A92E7B7C1CCB8D44CF79CB~YAAQstAXApyXSAKJAQAA3pBJNRQHNMf0UoNiq1NP8d2z1E2kfmk0JdhQm8qekE44xrLiMbsraKvaIdf3mf7e/s55vq7heUGMSbwU5Hd2N+z7SK7+NwBqluapxykxZ5PKEkN9J+PpoX4ElZ9V7P67funO5QEEwrR/54dK1Kllei0xOzp7uGn35P6jCNPS4dM6/EkoBr4YQAFtQiBEEEPpG3aH+7OBCWCkf2X+5xhneqLXm4Ytlx7FE+XZpNziimSbpxKvmBBo9TF1UhoXxP3sfcEcvaBHDmZajLj8BbvA2kCDz788yrTXyZs32k9V8sO5DP2dixcm3MNca0UIXeT7SHjf/e48Hy1I~1',
        'bm_sv': '0068DBC58138C9D4646C4E848FB861AD~YAAQstAXAgeYSAKJAQAAYsVJNRQrSwRQARYzfox++327Iap8HuJ8vfXANgc2oSZ9h9tf4zCERV9mGZOgrQBxQz4xCwHGD7qQxhiE7numHuf5n/qW3kSa5w7RZKbSuwKS6sJbtZnil3Gl0r7nlFht4ObvfOtScoPVK+DnYdYuunRL9IjMzoGwUUhg2nCXZksVnKARF+gmR1c1yqzP6gK8RmmGaM8FEocnG6TqLtI8YTVPaM4TWjj/gwvj6mIJ58SI~1',
        'ak_bmsc': '2FFFD60AD8D141F47C94320DD6091913~000000000000000000000000000000~YAAQstAXAgibSAKJAQAA4G1LNRRSUE5KIyEvZ8teqSpm88mDJXNzRmK091n/F3mZ9I8DtUZvyQU1+S0oyEYL11Fl5uCciQf+1/3EIOuZCPC8byE4XYNvkzfoQHZajlFL4ZPpCURsFImYjgAng4dmebJ9BYgN9wekeHCpQTevKu9kvs5kFRbAfAJDwgNX9JRIjTJLDOGByTAfTmf7eZncA4rRfitgtd3DDDFwLt22CKcMdVnMCEfwf8n4QgwR4axbNYQD4iyqWb1VOoM7bQDaK8mMByNgQ1DWVl6Y2zcG3rHUUKP68ANAPsJTiYEKyT1tgJkVu8Ya5TGxP476076P0N3G3W9DagbfjLbaG+wNugxHWbX+RrWhT1txNJWxnOjbRdhwEdj6fXU54Fr31FmmlgUfL6F8v80pvRw2Hr2wd4yVWAtBruMiP7W700Gkb/JTAOph/s0eS4ZD/e8=',
        'forterToken': 'e6d545d74c334ac79a06b6f71fefac7b_1688816915947_18_dUAL43-mnts-a9-d4_17ck',
        'default_currency': 'ILS',
    }

    headers = {
        'authority': 'il.shein.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        # 'cookie': 'cookieId=C3EB5523_FD86_E2D4_7D1C_B9DFEFB535C3; originOtherId=2582776306; country=IL; countryId=105; _gcl_aw=GCL.1687094185.Cj0KCQjw1rqkBhCTARIsAAHz7K386HraqSIwpSztVjfoHoWFDcJHroP-p9fBYijcSk8cTzb78tAx-zEaAo86EALw_wcB; _gcl_au=1.1.433664629.1687094185; language=en; cdn_key=illang%3Dilen; sessionID_shein=s%3AsE-8cxXOv-ubS3ZqpeuvmPMNN5yzuw9P.1smA7Apm4RbJ1hLnx4YUBC5xPea%2FQJLHml8YaOnR1oI; RESOURCE_ADAPT_WEBP=1; WEB_UGID_INIT=1; _csrf=Ew5vYWmDMHbt92FurFJk9WAL; revisit_canshow=1; have_show=1; jump_to_il=1; no_pop_up_il=1; hideCoupon=1; hideCouponWithRequest=1; hideCouponId_time=9051915_1; SWITCH_LANGUAGE_GUIDE_ID=C3EB5523_FD86_E2D4_7D1C_B9DFEFB535C3; smidV2=20230707160117f02cb9f015510e88e2e71a98cc6d95e1000e717a9eb311090; cate_channel_type=2; ssrAbt=typeBtype%3DAtype%3DBrule%3D1727_1766_767%3ABis_pde%3D3%26rule_id_120%3Drec_ver%3AS120V3.0%26rule_id_121%3Drec_ver%3AS121V2.1ZrangedetailtypelALogisticsTimeASizeTipsBUnderPriceFeedsoffUnderPriceShowASameLabelbannerConnetlabelAGroupsameA3PsellerdeliveryshowdetailshowsellerinfonoshowgoodsPicAbBdiscountLabelcallnolimitstoreyesReportshowhideMall_1; RESOURCE_ADAPT_DEVICE=width%3D1920%26height%3D1080%26dpr%3D1%26mobile%3D0%26ios%3D0; OptanonConsent=isIABGlobal=false&datestamp=Fri+Jul+07+2023+16%3A33%3A15+GMT%2B0300+(Israel+Daylight+Time)&version=6.13.0&hosts=&consentId=9db75548-292e-4bcf-a6d1-da714e728314&interactionCount=1&landingPath=https%3A%2F%2Fus.shein.com%2FSHEIN-EZwear-Solid-Elastic-Waist-Slant-Pocket-Sweatpants-p-3308015-cat-2990.html&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1; addressCookie=%7B%22countryId%22%3A%22105%22%2C%22createdTime%22%3A1688739277076%2C%22isUserHandle%22%3A%221%22%2C%22siteUid%22%3A%22il%22%7D; _abck=A4D5003E71B47CDD0A0237FFCC9836FC~0~YAAQpWQRAjL7XQSJAQAAX2xCNQrdl0kgUBwwnHeaXAL6hGvPZ2iSXaxz0wBIWmk9z0A2KqAB5Le91u+QkElWLCU8M1TRQP0M7j7R/SOpwv0D8rROol/Cy/0W4DhiQr4shbrfIbslRRX0NrTDjtMRwhJsGQ4sy6PnHbiV3lKjrqks5cqaNqhFVIALIYwOmU9aumrFvwtiDAGYigedbajnaN1NaCTDWRl+JzAq/Cjd3T2ulrGTu4lJ+EYP/mpsIoju0fau4MMgVPkln7g9ReoI6ISVT89PfjM38CRtJoqzTFVsgtJNrgdqA28kdCFjvTDqQI5g9rJj7sittiXidx6f5jj0nLo+EWqNTzLaRUEoAAlrTSCTHJInSBo8o/bbTa92Ik69fNapXtfgIZ4/yDHHWFvxiGJOdXE=~-1~-1~-1; bm_sz=BCE8DF6D0492A8464F4985A2861C6ED6~YAAQpWQRAjX7XQSJAQAAX2xCNRR45oN8gWTCLvOOZFh+tgkGMjZDJ2C/g9IMpblHAb0VoHRms7nJkpuPLOSWJYGXgG2B0Yr5ZGjF34aug+pY56sG38WjtbgyOfSq3gB8JoAjuhAKJosh6KZTbgLo7HxN2CnC7oB4Jc9r+VjEX0UW1rBPLutyMSR7aNtU8xF5mtfMJ+hGYzWN3Y4g6LYSMa/SHXByoXRQevADyVkdNeQ4hUE6hbmY2z0KVUY8uM6nXIwvQO65GPalAMuId08NmItIZw2o0lO2+2McmoX+FtAB7g==~3289409~3556145; bi_session_id=bi_1688815954957_54547; default_currency_expire=1; ftr_blst_1h=1688815957320; bm_mi=831891F7F2A92E7B7C1CCB8D44CF79CB~YAAQstAXApyXSAKJAQAA3pBJNRQHNMf0UoNiq1NP8d2z1E2kfmk0JdhQm8qekE44xrLiMbsraKvaIdf3mf7e/s55vq7heUGMSbwU5Hd2N+z7SK7+NwBqluapxykxZ5PKEkN9J+PpoX4ElZ9V7P67funO5QEEwrR/54dK1Kllei0xOzp7uGn35P6jCNPS4dM6/EkoBr4YQAFtQiBEEEPpG3aH+7OBCWCkf2X+5xhneqLXm4Ytlx7FE+XZpNziimSbpxKvmBBo9TF1UhoXxP3sfcEcvaBHDmZajLj8BbvA2kCDz788yrTXyZs32k9V8sO5DP2dixcm3MNca0UIXeT7SHjf/e48Hy1I~1; bm_sv=0068DBC58138C9D4646C4E848FB861AD~YAAQstAXAgeYSAKJAQAAYsVJNRQrSwRQARYzfox++327Iap8HuJ8vfXANgc2oSZ9h9tf4zCERV9mGZOgrQBxQz4xCwHGD7qQxhiE7numHuf5n/qW3kSa5w7RZKbSuwKS6sJbtZnil3Gl0r7nlFht4ObvfOtScoPVK+DnYdYuunRL9IjMzoGwUUhg2nCXZksVnKARF+gmR1c1yqzP6gK8RmmGaM8FEocnG6TqLtI8YTVPaM4TWjj/gwvj6mIJ58SI~1; ak_bmsc=2FFFD60AD8D141F47C94320DD6091913~000000000000000000000000000000~YAAQstAXAgibSAKJAQAA4G1LNRRSUE5KIyEvZ8teqSpm88mDJXNzRmK091n/F3mZ9I8DtUZvyQU1+S0oyEYL11Fl5uCciQf+1/3EIOuZCPC8byE4XYNvkzfoQHZajlFL4ZPpCURsFImYjgAng4dmebJ9BYgN9wekeHCpQTevKu9kvs5kFRbAfAJDwgNX9JRIjTJLDOGByTAfTmf7eZncA4rRfitgtd3DDDFwLt22CKcMdVnMCEfwf8n4QgwR4axbNYQD4iyqWb1VOoM7bQDaK8mMByNgQ1DWVl6Y2zcG3rHUUKP68ANAPsJTiYEKyT1tgJkVu8Ya5TGxP476076P0N3G3W9DagbfjLbaG+wNugxHWbX+RrWhT1txNJWxnOjbRdhwEdj6fXU54Fr31FmmlgUfL6F8v80pvRw2Hr2wd4yVWAtBruMiP7W700Gkb/JTAOph/s0eS4ZD/e8=; forterToken=e6d545d74c334ac79a06b6f71fefac7b_1688816915947_18_dUAL43-mnts-a9-d4_17ck; default_currency=ILS',
        'pragma': 'no-cache',
        'referer': 'https://il.shein.com/pdsearch/Leather%20jackets/?attr_values=Green-Purple-Yellow-Blue&ici=s1%60EditSearch%60Leather%20jackets%60_fb%60d0%60PageSearchResult&search_source=1&search_type=all&src_identifier=st%3D2%60sc%3DLeather%20jackets%60sr%3D0%60ps%3D1&src_module=search&src_tab_page_id=page_search1688816656507&page=1&attr_ids=27_81-27_334-27_2566-27_1000133-27_536-27_1000117-27_330-27_762-27_1000111-27_118-27_1000112-27_1000120-27_1000134&exc_attr_id=27',
        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'uber-trace-id': 'ff50b6ca892e3acf:ff50b6ca892e3acf:0:0',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'x-csrf-token': '0CbZCgOO-YFF4b3IuxhhKOervKG2qVNaStis',
        'x-requested-with': 'XMLHttpRequest',
    }

    params = {
        '_ver': '1.1.8',
        '_lang': 'en',
        'type': 'search',
        'routeId': f'{product}',
        'page': '1',
        'ici': f's1`EditSearch{product}_fb`d0`PageSearchResult',
        'search_source': '1',
        'search_type': 'all',
        'src_identifier': f'st=2`sc{product}sr=0`ps=1',
        'src_module': 'search',
        'src_tab_page_id': 'page_search1688816656507',
        # 'child_cat_id': f'{gender}6',
        'attr_values': '.-'.join(colors),
        'attr_ids': '27_81-27_334-27_2566-27_1000133-27_536-27_1000117-27_330-27_762-27_1000111-27_118-27_1000112-27_1000120-27_1000134',
        'exc_attr_id': '27',
        'requestType': 'refresh',
    }
    return cookies, headers, params

