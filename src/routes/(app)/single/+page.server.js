export async function load({url,fetch}) {
    const contentId = url.searchParams.get('contentid')
    const content = await fetch('/api/handle-content?contentid=' + contentId)
                            .then(async res => await res.json())
    return {
        content:content[0]
    };
}
