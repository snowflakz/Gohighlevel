from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent
site = root / 'site'
out = root / 'outputs' / 'strategy'
readme = site / 'README.md'
text = readme.read_text(encoding='utf-8')
text = text.replace('A live error has not been diagnosed without its deployment URL/log.', 'The public gohighlevel-beta.vercel.app address was confirmed to return Vercel 404 NOT_FOUND on 4 October 2026. Project settings remain unverified pending dashboard sign-in; see VERCEL-DEPLOYMENT.md.')
text = text.replace('The prepared Sites review is separate from domain connection. Neither a local server nor a private preview makes BrigePoint.com publicly live.', 'Local files are not automatically synchronized to the existing Vercel deployment. A new deployment containing these changes is required.')
readme.write_text(text,encoding='utf-8')
with ZipFile(out / 'BrigePoint-vercel-ready.zip','w',ZIP_DEFLATED) as z:
    for p in sorted((site/'dist').rglob('*')):
        if p.is_file() and p.name != 'workspace-source.jpg':
            z.write(p,p.relative_to(site).as_posix())
    for name in ['vercel.json','.vercelignore','README.md','ASSET-LICENSES.md']:
        z.write(site/name,name)
    z.write(out/'VERCEL-DEPLOYMENT.md','VERCEL-DEPLOYMENT.md')
with ZipFile(out / 'BrigePoint-vercel-ready.zip') as z:
    assert z.testzip() is None
    assert 'dist/index.html' in z.namelist()
    assert 'vercel.json' in z.namelist()
    assert not any('.git/' in p or 'node_modules/' in p for p in z.namelist())
    print('Deployment ZIP verified:',len(z.namelist()),'files')
