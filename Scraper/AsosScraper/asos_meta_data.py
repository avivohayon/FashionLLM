colors_dict = {
    'White': 5, 'Black': 4, 'Blue': 3, 'Multi': 17, 'Green': 2, 'Neutral': 37, 'Pink': 9,
    'Brown': 10, 'Navy': 33, 'Orange': 7, 'Red': 1, 'Purple': 8, 'Grey': 16, 'Yellow': 6,
    'Silver': 12, 'Gold': 11, 'Copper': 14, 'No colour': 21, 'Auburn': 34
}

def get_color_nums(colors: list[str]) -> list[int]:
    """
    convert the list of colors into their asos int value
    :param colors: list of string representing the colors
    :return: list of in represent the colors for the asos api
    """
    result = [colors_dict[color] for color in colors if color in colors_dict.keys()]
    return result
def init_asos_request_metadata(product: str, colors: list[str], gender: str) -> tuple[dict, dict, dict]:

    """
    init the relevent meta data for the get request in asos.com
    :param product: string - name of the product to get
    :param colors: list of string, each string is a color
    :param gender: string - Men or Women
    :return: tuple of 3 metadata dicts - cookies, headers, params
    """
    gender = 1 if gender == 'Men' else 0
    int_list = get_color_nums(colors)
    colors_string = ','.join(str(num) for num in int_list)
    cookies = {
        'featuresId': '07adb4e3-0c27-4fff-840c-7c06a3bb1bdf',
        '_gcl_au': '1.1.799408543.1687098031',
        'bt_stdstatus': 'NOTSTUDENT',
        '_cs_c': '0',
        'stc-welcome-message': 'cappedPageCount=2&resolvedDeliveryCountry=IL',
        'geocountry': 'IL',
        'AMCVS_C0137F6A52DEAFCC0A490D4C%40AdobeOrg': '1',
        'asos-perx': '3d1f53e3367749eb878b3654894ca360||bde5c75efc954fd2940c0623820f357f',
        's_cc': 'true',
        'browseCountry': 'IL',
        'browseCurrency': 'ILS',
        'browseLanguage': 'en-GB',
        'browseSizeSchema': 'EU',
        'storeCode': 'ROW',
        'currency': '10046',
        'asosAffiliate': 'affiliateId=10700',
        '_gcl_aw': 'GCL.1687356185.CjwKCAjwv8qkBhAnEiwAkY-aht0lBZKE6x1xcNVhC65QHmtMYp0VtAlznDgz3anXlFkBNzqblDyNMxoCjJEQAvD_BwE',
        '_gcl_dc': 'GCL.1687356185.CjwKCAjwv8qkBhAnEiwAkY-aht0lBZKE6x1xcNVhC65QHmtMYp0VtAlznDgz3anXlFkBNzqblDyNMxoCjJEQAvD_BwE',
        'bt_gclid': 'CjwKCAjwv8qkBhAnEiwAkY-aht0lBZKE6x1xcNVhC65QHmtMYp0VtAlznDgz3anXlFkBNzqblDyNMxoCjJEQAvD_BwE',
        'bt_affid': '10700',
        'floor': '1000',
        'asos': 'PreferredSite=&currencyid=10046&currencylabel=ILS&topcatid=1000&customerid=-1&customerguid=3d1f53e3367749eb878b3654894ca360',
        'bm_sz': 'DB836EC0E2FD66F47FAF96B069D4C1A8~YAAQl/8SAiPVw9yIAQAA3F6P4hQzLCvKJdcJyd/Sn816fONLVkHV7U1Y7MAK1JQGgt6B5fRJnIzaCoOkv/YeKBRouaU7LwFWSLdJ1fqfgHYG/yg2lk8DOti/1sWPJFtNd35tcjYaxW97Pp19Sv2u9jDTs2RXizFq6RI6b+1sXpcaeiOo/L3l/jVd4viisi29tVyDwl7zTqoaXljH88KJjIaL/KhpYq9mRAI/SBuDg3UsKWDziVDoBwqc6nh+hR2ewJ4a5rPGfy0TXoA9AOho3yHhdBMOrrSVyH2lA1G+Xv21~3553091~3621175',
        '_s_fpv': 'true',
        'AMCV_C0137F6A52DEAFCC0A490D4C%40AdobeOrg': '-1303530583%7CMCMID%7C25193479769954055961606549063999944440%7CMCAID%7CNONE%7CMCOPTOUT-1687436111s%7CNONE%7CvVersion%7C3.3.0',
        'siteChromeVersion': 'au=12&com=12&de=12&dk=12&es=12&fr=12&it=12&nl=12&pl=12&roe=12&row=12&ru=12&se=12&us=12',
        'keyStoreDataversion': 'ornjx7v-36',
        'asos-b-sdv629': 'ornjx7v-36',
        '_abck': 'D5E63C3455B523AD3A975BB29DE0BCF5~0~YAAQvGndWGMPsd6IAQAAV/OZ4grl8VJU2VjVNCT8b9viVwsRubON0qTP/FngxArrbUqWpdHfSqkRfoc2zhIrm11sHgICZR5lEYVmZykFBh5qQVeu+4K6pLM/GU7qe/zbXeVwCOT0bxXQFMDHBSPTWEkIaWHaZuY6NSedMPdrj7nHAzYeiIdNzXlgWcnoTBXTddNtq8fSU0iKAyGGCqsRVsOrzK3zSENxam4BPTSk/Pg9nGlUMf5OUP3FUG5mFwYX22lFxl3CjEm9uKU67P/A7SixWSIizOK7Rx+wNGNBb8U27zQOQKbHpCAui1Uy6mIudjipN2lg437HQAUwWXSukuCNwpN4qvR1dHzPeqNafJgnENjDw6TJPjRGEXn2GHWCYx+pqTdE60aI2sUQRj6idTZwMLkUkQ==~-1~-1~1687432487',
        'plp_columsCount': 'fourColumns',
        '_cs_mk_aa': '0.15710830176020107_1687430035789',
        'ak_bmsc': '77EA5DDBB71F87604420FDD026A3B5A3~000000000000000000000000000000~YAAQb58XAue4fL2IAQAAMp2t4hSIPwWB6LpTfPC1fvG3fT9g7w3tkMuzfCqUUJ1IRrT74JCSWYt5kdq4ttjvZQxmnd2uQ5DyVh4OQuvt4hTH7hKyq+uzpQ+IjaH+g1iFry4qfSMrRPFjZnxRkpP63pd2bpg4cxcgeiA3w/39+/k84JFGCugLv2MHFpHOgwLjFkAOLKt2lTAIXAX2VX132GV41iaV6N5X7kWTiNSwxGJDncxNGoayxv42PAUWjG8M/y31Kvtj8mOO9L9+Jhq4S0XeOH/YC7jhwCrFj4sRqLAkOvgOho6/ffbYe6VfuwZ3w0lpc2KdVHzRV4AP4ahkctL/CoaEjuYa3KRoj2cTx0A+ufTovsvKN/cnZtFt8MGyVTBF3JV8h1PD6hEd0Qx/8x1sch0C',
        'bm_mi': '948DDEA5318641FE55D9D95C0D497A92~YAAQb58XAna6fL2IAQAA9Hyu4hTxyxYkJk7NejNg/risKRmIEccNK8Ci7d/uc5DHa2vTfSHyMRlEC1Cmjuic0zzek7AzfGNGwdISh7vADs8Al/5K+rBmAbohPuytVQOLKrEzT+G7p+IYKzRYP31XBbKwtRmzlH1LMYVVYOwl084c5tc+enqKUJAhRFogaWz68aaWRT4Tc3qk0iPUBgTiTQCmjcaP8bf3r+WYaMKlRoa6sPeslXLWgkmWuBuKU5PhTfpmpCNi4BOpmypcUsMEOXxWmFBeYf+/NjFpLHDXLweiW9jmWFw8eytGdexf2W6kDOXaVDo6QSwWVUy1WM9ntVqLUm9Fbl/V~1',
        'bm_sv': '2A2A0BDA80053127E6B687116A2B57F6~YAAQb58XAtq6fL2IAQAAYaiu4hQiAE/PKtteobCfKPHM9EXp/V8DvFeQ+h5ZeoT+w5k0a44YZs+1ykoke8ibSTxH/AKsNG01kfWOO43gk9ylNfqO5tWV0SbpAdBm2tYF0taQj0iYcfUTM8FqR489e+33vS6inBWDzRXy/XtfT+H36LIiHp3l4RRDclkYFZghnkkbxgrEO0zMT79q3hPdygsZgX668eX0lMjuhWi9xYg32w4+P9yMS0kpUyRfOg==~1',
        'OptanonConsent': 'isGpcEnabled=0&datestamp=Thu+Jun+22+2023+13%3A37%3A58+GMT%2B0300+(Israel+Daylight+Time)&version=202301.2.0&isIABGlobal=false&hosts=&landingPath=https%3A%2F%2Fwww.asos.com%2Fsearch%2F%3Fq%3Dleather+pants&groups=C0001%3A1%2CC0003%3A1%2CC0004%3A1',
        's_pers': '%20s_vnum%3D1688158800647%2526vn%253D9%7C1688158800647%3B%20gpv_eVar230%3Dno%2520value%7C1687430713092%3B%20gpv_eVar234%3Dno%2520value%7C1687430713110%3B%20gpv_p6%3D%2520%7C1687432066125%3B%20s_nr%3D1687430278245-Repeat%7C1718966278245%3B%20gpv_e47%3Dno%2520value%7C1687432078246%3B%20gpv_p10%3Ddesktop%2520row%257Csearch%2520page%257Csuccessful%2520search%7C1687432078248%3B%20gpv_e231%3D447843fb-1765-4227-9052-bc0e552ad8fb%7C1687432140197%3B%20eVar225%3D73%7C1687432140211%3B%20s_invisit%3Dtrue%7C1687432140215%3B%20visitCount%3D9%7C1687432140216%3B',
        's_sq': '%5B%5BB%5D%5D',
        '_cs_id': 'd5623ad9-8442-af5a-c0fb-db4e0e05bb5f.1687098031.9.1687430344.1687426724.1628755191.1721262031328',
        '_cs_s': '75.0.0.1687432144536',
    }

    headers = {
        'authority': 'www.asos.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'asos-c-name': '@asosteam/asos-web-product-listing-page',
        'asos-c-plat': 'web',
        'asos-c-ver': '1.2.0-3fbc76035c2b-9326',
        'asos-cid': '989444f0-67aa-42e2-81c3-bbda45273a5b',
        'cache-control': 'no-cache',
        # 'cookie': 'featuresId=07adb4e3-0c27-4fff-840c-7c06a3bb1bdf; _gcl_au=1.1.799408543.1687098031; bt_stdstatus=NOTSTUDENT; _cs_c=0; stc-welcome-message=cappedPageCount=2&resolvedDeliveryCountry=IL; geocountry=IL; AMCVS_C0137F6A52DEAFCC0A490D4C%40AdobeOrg=1; asos-perx=3d1f53e3367749eb878b3654894ca360||bde5c75efc954fd2940c0623820f357f; s_cc=true; browseCountry=IL; browseCurrency=ILS; browseLanguage=en-GB; browseSizeSchema=EU; storeCode=ROW; currency=10046; asosAffiliate=affiliateId=10700; _gcl_aw=GCL.1687356185.CjwKCAjwv8qkBhAnEiwAkY-aht0lBZKE6x1xcNVhC65QHmtMYp0VtAlznDgz3anXlFkBNzqblDyNMxoCjJEQAvD_BwE; _gcl_dc=GCL.1687356185.CjwKCAjwv8qkBhAnEiwAkY-aht0lBZKE6x1xcNVhC65QHmtMYp0VtAlznDgz3anXlFkBNzqblDyNMxoCjJEQAvD_BwE; bt_gclid=CjwKCAjwv8qkBhAnEiwAkY-aht0lBZKE6x1xcNVhC65QHmtMYp0VtAlznDgz3anXlFkBNzqblDyNMxoCjJEQAvD_BwE; bt_affid=10700; floor=1000; asos=PreferredSite=&currencyid=10046&currencylabel=ILS&topcatid=1000&customerid=-1&customerguid=3d1f53e3367749eb878b3654894ca360; bm_sz=DB836EC0E2FD66F47FAF96B069D4C1A8~YAAQl/8SAiPVw9yIAQAA3F6P4hQzLCvKJdcJyd/Sn816fONLVkHV7U1Y7MAK1JQGgt6B5fRJnIzaCoOkv/YeKBRouaU7LwFWSLdJ1fqfgHYG/yg2lk8DOti/1sWPJFtNd35tcjYaxW97Pp19Sv2u9jDTs2RXizFq6RI6b+1sXpcaeiOo/L3l/jVd4viisi29tVyDwl7zTqoaXljH88KJjIaL/KhpYq9mRAI/SBuDg3UsKWDziVDoBwqc6nh+hR2ewJ4a5rPGfy0TXoA9AOho3yHhdBMOrrSVyH2lA1G+Xv21~3553091~3621175; _s_fpv=true; AMCV_C0137F6A52DEAFCC0A490D4C%40AdobeOrg=-1303530583%7CMCMID%7C25193479769954055961606549063999944440%7CMCAID%7CNONE%7CMCOPTOUT-1687436111s%7CNONE%7CvVersion%7C3.3.0; siteChromeVersion=au=12&com=12&de=12&dk=12&es=12&fr=12&it=12&nl=12&pl=12&roe=12&row=12&ru=12&se=12&us=12; keyStoreDataversion=ornjx7v-36; asos-b-sdv629=ornjx7v-36; _abck=D5E63C3455B523AD3A975BB29DE0BCF5~0~YAAQvGndWGMPsd6IAQAAV/OZ4grl8VJU2VjVNCT8b9viVwsRubON0qTP/FngxArrbUqWpdHfSqkRfoc2zhIrm11sHgICZR5lEYVmZykFBh5qQVeu+4K6pLM/GU7qe/zbXeVwCOT0bxXQFMDHBSPTWEkIaWHaZuY6NSedMPdrj7nHAzYeiIdNzXlgWcnoTBXTddNtq8fSU0iKAyGGCqsRVsOrzK3zSENxam4BPTSk/Pg9nGlUMf5OUP3FUG5mFwYX22lFxl3CjEm9uKU67P/A7SixWSIizOK7Rx+wNGNBb8U27zQOQKbHpCAui1Uy6mIudjipN2lg437HQAUwWXSukuCNwpN4qvR1dHzPeqNafJgnENjDw6TJPjRGEXn2GHWCYx+pqTdE60aI2sUQRj6idTZwMLkUkQ==~-1~-1~1687432487; plp_columsCount=fourColumns; _cs_mk_aa=0.15710830176020107_1687430035789; ak_bmsc=77EA5DDBB71F87604420FDD026A3B5A3~000000000000000000000000000000~YAAQb58XAue4fL2IAQAAMp2t4hSIPwWB6LpTfPC1fvG3fT9g7w3tkMuzfCqUUJ1IRrT74JCSWYt5kdq4ttjvZQxmnd2uQ5DyVh4OQuvt4hTH7hKyq+uzpQ+IjaH+g1iFry4qfSMrRPFjZnxRkpP63pd2bpg4cxcgeiA3w/39+/k84JFGCugLv2MHFpHOgwLjFkAOLKt2lTAIXAX2VX132GV41iaV6N5X7kWTiNSwxGJDncxNGoayxv42PAUWjG8M/y31Kvtj8mOO9L9+Jhq4S0XeOH/YC7jhwCrFj4sRqLAkOvgOho6/ffbYe6VfuwZ3w0lpc2KdVHzRV4AP4ahkctL/CoaEjuYa3KRoj2cTx0A+ufTovsvKN/cnZtFt8MGyVTBF3JV8h1PD6hEd0Qx/8x1sch0C; bm_mi=948DDEA5318641FE55D9D95C0D497A92~YAAQb58XAna6fL2IAQAA9Hyu4hTxyxYkJk7NejNg/risKRmIEccNK8Ci7d/uc5DHa2vTfSHyMRlEC1Cmjuic0zzek7AzfGNGwdISh7vADs8Al/5K+rBmAbohPuytVQOLKrEzT+G7p+IYKzRYP31XBbKwtRmzlH1LMYVVYOwl084c5tc+enqKUJAhRFogaWz68aaWRT4Tc3qk0iPUBgTiTQCmjcaP8bf3r+WYaMKlRoa6sPeslXLWgkmWuBuKU5PhTfpmpCNi4BOpmypcUsMEOXxWmFBeYf+/NjFpLHDXLweiW9jmWFw8eytGdexf2W6kDOXaVDo6QSwWVUy1WM9ntVqLUm9Fbl/V~1; bm_sv=2A2A0BDA80053127E6B687116A2B57F6~YAAQb58XAtq6fL2IAQAAYaiu4hQiAE/PKtteobCfKPHM9EXp/V8DvFeQ+h5ZeoT+w5k0a44YZs+1ykoke8ibSTxH/AKsNG01kfWOO43gk9ylNfqO5tWV0SbpAdBm2tYF0taQj0iYcfUTM8FqR489e+33vS6inBWDzRXy/XtfT+H36LIiHp3l4RRDclkYFZghnkkbxgrEO0zMT79q3hPdygsZgX668eX0lMjuhWi9xYg32w4+P9yMS0kpUyRfOg==~1; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Jun+22+2023+13%3A37%3A58+GMT%2B0300+(Israel+Daylight+Time)&version=202301.2.0&isIABGlobal=false&hosts=&landingPath=https%3A%2F%2Fwww.asos.com%2Fsearch%2F%3Fq%3Dleather+pants&groups=C0001%3A1%2CC0003%3A1%2CC0004%3A1; s_pers=%20s_vnum%3D1688158800647%2526vn%253D9%7C1688158800647%3B%20gpv_eVar230%3Dno%2520value%7C1687430713092%3B%20gpv_eVar234%3Dno%2520value%7C1687430713110%3B%20gpv_p6%3D%2520%7C1687432066125%3B%20s_nr%3D1687430278245-Repeat%7C1718966278245%3B%20gpv_e47%3Dno%2520value%7C1687432078246%3B%20gpv_p10%3Ddesktop%2520row%257Csearch%2520page%257Csuccessful%2520search%7C1687432078248%3B%20gpv_e231%3D447843fb-1765-4227-9052-bc0e552ad8fb%7C1687432140197%3B%20eVar225%3D73%7C1687432140211%3B%20s_invisit%3Dtrue%7C1687432140215%3B%20visitCount%3D9%7C1687432140216%3B; s_sq=%5B%5BB%5D%5D; _cs_id=d5623ad9-8442-af5a-c0fb-db4e0e05bb5f.1687098031.9.1687430344.1687426724.1628755191.1721262031328; _cs_s=75.0.0.1687432144536',
        'pragma': 'no-cache',
        'referer': f'https://www.asos.com/search/?q=leather%20pants&currentpricerange=30-1655&refine=base_colour:{colors_string}|floor:1001',
        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
    }

    params = {
        'offset': '0',
        'q': f'{product}',
        'tst-search-advertisements': 'true',
        'store': 'ROW',
        'lang': 'en-GB',
        'currency': 'ILS',
        'rowlength': '4',
        'channel': 'desktop-web',
        'country': 'IL',
        'keyStoreDataversion': 'ornjx7v-36',
        'limit': '72',
        'base_colour': f'{colors_string}',
        'floor': f'100{gender}',
    }
    return cookies, headers, params

# response = requests.get('https://www.asos.com/api/product/search/v2/', params=params, cookies=cookies, headers=headers)

